import { Routes, Route } from 'react-router'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      {/* 用通配符兜底：直接访问 /index.html 等路径时也能渲染首页 */}
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
