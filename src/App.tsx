import { Habit } from "./components/Habit"
import "./styles/global.css"

export function App() {
  return (
    <>
      <Habit completed={10}/>
      <Habit completed={3}/>
      <Habit completed={5}/>
      <Habit completed={9}/>
      <Habit completed={2}/>
    </>
  )
}