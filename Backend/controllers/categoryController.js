import Categories from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Category name is required" });
    }
    const existingCategory = await Categories.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({ message: "Category already exists" });
    }
    const newCategory = new Categories({ name, slug: slugify(name) });
    await newCategory.save();
    res
      .status(200)
      .send({ message: "Successfully created new category", newCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(404).send({ error: "New category name required" });
    }
    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({ message: "Successfully category updated", updatedCategory });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Categories.find({})
    res.status(200).send({ message: "All Categories", category })
  } catch (error) {
    res.status(404).send({ error })
  }

}

export const getCategoryByName = async (req, res) => {
  try {
    const { slug } = req.params
    const category = await Categories.findOne({slug})
    res.status(200).send({ category })
  } catch (error) {
    res.status(404).send({ error })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Categories.findByIdAndDelete(id)
    res.status(200).send({ message: "Successfully deleted" })
  } catch (error) {
    res.status(404).send({ error })
  }
}