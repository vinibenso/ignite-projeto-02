import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from 'react';
import { CyclesContext } from '../..';
import { useFormContext } from "react-hook-form";

export function NewCycleForm(){
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
  <FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      id="task"
      list="task-suggestions"
      placeholder="De um nome para seu projeto"
      disabled={!!activeCycle}
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
      disabled={!!activeCycle}
      {...register('minutesAmount', { valueAsNumber: true })}
    />

    <span>minutos.</span>

  </FormContainer >)
}