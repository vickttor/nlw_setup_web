import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from 'phosphor-react';
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Loading } from "./Loading";
import { motion } from "framer-motion";


interface HabitPopoverListProps {
  date: Date
  onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[]
}

export function HabitPopoverList({ date, onCompletedChanged}: HabitPopoverListProps) {

  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api.get("day", {
      params: {
        date: date.toISOString()
      }
    }).then(response => {
      setHabitsInfo(response.data);
    }).finally(()=> {
      setLoading(false);
    });

  }, []);

  async function handleToggleHabit(habitId: string) {
    await api.patch(`habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);
    
    let completedHabits: string[] = [];

    if(isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id=>id!==habitId)

    }else{
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    });

    onCompletedChanged(completedHabits.length);
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  if(loading) {
    return <div className="mt-6 flex flex-col gap-3">
      <Loading/>
    </div>
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo && habitsInfo.possibleHabits.length > 0 ? habitsInfo.possibleHabits.map((habit) => {
        return (
          <motion.div
            tabIndex={-1}
            whileHover={{  scale: 1.05 }}
            transition={{ duration: 0.1 }}
          >
            <Checkbox.Root
              key={habit.id}
              onCheckedChange={()=> handleToggleHabit(habit.id)}
              checked={habitsInfo.completedHabits.includes(habit.id)}
              disabled={isDateInPast}
              className='flex items-center gap-3 group disabled:cursor-not-allowed focus:outline-none'
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check
                    size={20}
                    className="text-white"
                  />
                </Checkbox.Indicator>
              </div>

              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                {habit.title}
              </span>

            </Checkbox.Root>
          </motion.div>
        )
      })
      : 
      <p className="w-full font-semibold text-white text-2xl text-center">
        Não há tarefas registradas
      </p>
      }
    </div>
  )
}