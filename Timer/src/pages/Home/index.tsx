import {useForm} from 'react-hook-form';
import { Play } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';


import {
  FormContainer,
  HomeContainer,
  CountdownContainer,
  Separator,
  StartCountdownButton,
  MinutesAmountInput,
  TaskInput,
} from "./styles";
import { useState } from 'react';
import { min } from 'date-fns/esm';
import { minutesInHour } from 'date-fns';


 const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), 
    defaultValues: {
    task: '',
    minutesAmount: 0,
    }
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
    setCycles((state) =>[...state, newCycle])
    setActiveCycleId(newCycle.id)

    reset();
  }

  
  const activeCycle = cycles.find((cycle )=> cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor (currentSeconds / 60)
  const secondsAmount = currentSeconds % 60


  const task = watch('task')
  const isSubmitDisabled = !task;

  return (

    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="De um nome para seu projeto"
            {...register('task')}     
                
          />

          <datalist id="task-suggestions">3
            <option value="Projeto 01" />
            <option value="Projeto 02" />
            <option value="Projeto 03" />
            <option value="Projeto 04" />
            <option value="Projeto 05" />

          </datalist>

          <label htmlFor="">durante</label>

          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled } type="submit">
          <Play
            size={24} />
          Começar
        </StartCountdownButton >
      </form>

    </HomeContainer>
  )
}
