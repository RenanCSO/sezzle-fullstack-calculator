import { CalculatorForm } from './components/CalculatorForm'
import { useCalculator } from './hooks/useCalculator'
import styles from './App.module.css'

function App() {
  const calculator = useCalculator()

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <CalculatorForm
          operation={calculator.operation}
          setOperation={calculator.setOperation}
          operandA={calculator.operandA}
          setOperandA={calculator.setOperandA}
          operandB={calculator.operandB}
          setOperandB={calculator.setOperandB}
          result={calculator.result}
          error={calculator.error}
          isLoading={calculator.isLoading}
          isUnary={calculator.isUnary}
          onSubmit={() => void calculator.submit()}
        />
      </div>
    </main>
  )
}

export default App
