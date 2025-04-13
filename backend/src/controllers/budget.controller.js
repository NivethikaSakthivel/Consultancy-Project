// File: controllers/budget.controller.js
const db = require('../models');
const fs = require('fs').promises;
const path = require('path');
const Budget = db.budgets;
const User = db.users;

// Create a new budget entry
exports.create = async (req, res) => {
  try {
    // Get file info if uploaded
    const proofFileName = req.file ? req.file.filename : null;
    
    // Create budget entry
    const budgetEntry = await Budget.create({
      category: req.body.category,
      description: req.body.description,
      budget_amount: req.body.budgetAmount,
      actual_amount: req.body.actualAmount,
      proof_file_name: proofFileName,
      created_by: req.userId
    });

    res.status(201).send({
      message: "Budget entry created successfully!",
      data: budgetEntry
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get all budget entries
exports.findAll = async (req, res) => {
  try {
    // Optional filter by month
    let condition = {};
    const month = req.query.month;
    
    if (month && month !== 'all') {
      // Convert month name to month number (January = 0, etc.)
      const monthIndex = new Date(`${month} 1, 2000`).getMonth();
      
      condition = db.Sequelize.where(
        db.Sequelize.fn('MONTH', db.Sequelize.col('date')), 
        monthIndex + 1 // Add 1 as SQL months are 1-based while JS months are 0-based
      );
    }

    const budgetEntries = await Budget.findAll({
      where: condition,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['username']
        }
      ],
      order: [['date', 'DESC']]
    });

    res.status(200).send(budgetEntries);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single budget entry by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    
    const budgetEntry = await Budget.findByPk(id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['username']
        }
      ]
    });
    
    if (!budgetEntry) {
      return res.status(404).send({ message: `Budget entry with id ${id} not found.` });
    }
    
    res.status(200).send(budgetEntry);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a budget entry
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Find the budget entry
    const budgetEntry = await Budget.findByPk(id);
    
    if (!budgetEntry) {
      return res.status(404).send({ message: `Budget entry with id ${id} not found.` });
    }
    
    // Handle file upload if provided
    let proofFileName = budgetEntry.proof_file_name;
    
    if (req.file) {
      // Delete old file if exists
      if (budgetEntry.proof_file_name) {
        try {
          await fs.unlink(path.join(process.env.UPLOAD_DIR || './uploads', budgetEntry.proof_file_name));
        } catch (error) {
          console.error("Error deleting old file:", error);
        }
      }
      
      // Set new file name
      proofFileName = req.file.filename;
    }
    
    // Update the budget entry
    const updatedEntry = await budgetEntry.update({
      category: req.body.category,
      description: req.body.description,
      budget_amount: req.body.budgetAmount,
      actual_amount: req.body.actualAmount,
      proof_file_name: proofFileName
    });
    
    res.status(200).send({
      message: "Budget entry updated successfully!",
      data: updatedEntry
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a budget entry
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Find the budget entry
    const budgetEntry = await Budget.findByPk(id);
    
    if (!budgetEntry) {
      return res.status(404).send({ message: `Budget entry with id ${id} not found.` });
    }
    
    // Delete associated file if exists
    if (budgetEntry.proof_file_name) {
      try {
        await fs.unlink(path.join(process.env.UPLOAD_DIR || './uploads', budgetEntry.proof_file_name));
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
    
    // Delete the budget entry
    await budgetEntry.destroy();
    
    res.status(200).send({ message: "Budget entry deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get monthly summary (budget vs actual)
exports.getMonthlySummary = async (req, res) => {
  try {
    const summary = await Budget.findAll({
      attributes: [
        [db.Sequelize.fn('MONTH', db.Sequelize.col('date')), 'month'],
        [db.Sequelize.fn('YEAR', db.Sequelize.col('date')), 'year'],
        [db.Sequelize.fn('SUM', db.Sequelize.col('budget_amount')), 'totalBudget'],
        [db.Sequelize.fn('SUM', db.Sequelize.col('actual_amount')), 'totalActual']
      ],
      group: [
        db.Sequelize.fn('MONTH', db.Sequelize.col('date')),
        db.Sequelize.fn('YEAR', db.Sequelize.col('date'))
      ],
      order: [
        [db.Sequelize.literal('year'), 'ASC'],
        [db.Sequelize.literal('month'), 'ASC']
      ]
    });
    
    // Format the result with month names
    const formattedSummary = summary.map(item => {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
      
      return {
        month: monthNames[item.dataValues.month - 1],
        year: item.dataValues.year,
        totalBudget: parseFloat(item.dataValues.totalBudget),
        totalActual: parseFloat(item.dataValues.totalActual),
        variance: parseFloat(item.dataValues.totalBudget) - parseFloat(item.dataValues.totalActual)
      };
    });
    
    res.status(200).send(formattedSummary);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Download proof file
exports.downloadProof = async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(process.env.UPLOAD_DIR || './uploads', fileName);
    
    res.download(filePath, fileName, (err) => {
      if (err) {
        res.status(404).send({ message: "File not found." });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};