import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/admin')
  }, [])

  return (
    <div>index</div>
  )
}

export default Home
