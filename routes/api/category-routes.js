const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories and include their associated Products
    const categories = await Category.findAll({
      include: [Product],
    });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value and include its associated Products
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: [Product],
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const categoryId = req.params.id;
    const updatedCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });

    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category updated successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const categoryId = req.params.id;
    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category deleted successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
