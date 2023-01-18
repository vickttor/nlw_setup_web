interface HabitProps {
  completed: number
}

export function Habit({completed}: HabitProps) {
  return (
    <div className="bg-purple-700 p-4 rounded-md w-10 h-10 m-4 flex items-center justify-center text-white hover:-translate-y-1 duration-200 transition-all cursor-pointer font-bold">{completed}</div>
  )
}