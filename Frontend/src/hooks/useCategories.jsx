import axios from "axios"
import { useEffect, useState } from "react"

const useCategories = () => {
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        const { data } = await axios.get("http://localhost:3582/api/v1/categories/categories")
        setCategories(data?.category)
    }

    useEffect(() => {
        getCategories()
    }, [])
  return categories
}

export default useCategories
