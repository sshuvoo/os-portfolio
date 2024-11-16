import { CalcButton } from './calc-button'
import { IconBackspace, IconPlusMinus } from '@tabler/icons-react'
import { VscPercentage } from 'react-icons/vsc'
import {
  IconCalculator,
  IconDivide,
  IconEqual,
  IconMinus,
  IconPlus,
  IconX,
} from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { refineExp } from '@/app/utils/refineExp'

export function Calculator() {
  const [history, setHistory] = useState('')
  const [expression, setExpression] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const execute = refineExp(expression)
  const [mode, setMode] = useState<'typing' | 'result'>('result')

  const handlePress = (value: string) => {
    setMode('typing')
    setExpression((pre) => pre + value)
  }

  const onClear = () => {
    setHistory('')
    setExpression('')
  }

  const onBackspace = () => {
    if (expression.length >= 1) {
      setExpression((pre) => pre.slice(0, pre.length - 1))
    }
  }

  const onCalculate = () => {
    if (execute) {
      const temp = expression
      try {
        setExpression(eval(execute))
        setHistory(temp)
        setMode('result')
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      if (mode === 'typing') {
        inputRef.current.scrollLeft = inputRef.current.scrollWidth
      } else {
        inputRef.current.scrollLeft = 0
      }
    }
  }, [expression, mode])

  return (
    <>
      <div className="mb-2">
        <div className="flex flex-col">
          <input
            value={history || ''}
            readOnly
            className="h-8 w-[220px] !cursor-custom-auto overflow-y-hidden bg-transparent text-right text-2xl text-gray-400 focus:outline-none"
          />
          <input
            ref={inputRef}
            value={expression || 0}
            readOnly
            className="w-[220px] !cursor-custom-auto bg-transparent text-right text-4xl focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-[auto,auto,auto,auto] gap-2">
        {mode === 'typing' ? (
          <CalcButton onPress={onBackspace}>
            <IconBackspace stroke={2} />
          </CalcButton>
        ) : (
          <CalcButton onPress={onClear} label="AC" />
        )}
        <CalcButton
          onPress={() => {
            if (expression) {
              if (!Number.isNaN(Number(expression))) {
                setExpression((-1 * Number(expression)).toString())
              }
            }
          }}
        >
          <IconPlusMinus stroke={2} />
        </CalcButton>
        <CalcButton>
          <VscPercentage className="text-2xl" />
        </CalcButton>
        <CalcButton
          onPress={() => {
            if (expression) {
              const last = expression[expression.length - 1]
              if (
                last !== '+' &&
                last !== '-' &&
                last !== '×' &&
                last !== '÷'
              ) {
                handlePress('÷')
              }
            }
          }}
          isHighlight
        >
          <IconDivide stroke={2} />
        </CalcButton>
        <CalcButton onPress={() => handlePress('7')} label="7" />
        <CalcButton onPress={() => handlePress('8')} label="8" />
        <CalcButton onPress={() => handlePress('9')} label="9" />
        <CalcButton
          onPress={() => {
            if (expression) {
              const last = expression[expression.length - 1]
              if (
                last !== '+' &&
                last !== '-' &&
                last !== '×' &&
                last !== '÷'
              ) {
                handlePress('×')
              }
            }
          }}
          isHighlight
        >
          <IconX stroke={2} />
        </CalcButton>
        <CalcButton onPress={() => handlePress('4')} label="4" />
        <CalcButton onPress={() => handlePress('5')} label="5" />
        <CalcButton onPress={() => handlePress('6')} label="6" />
        <CalcButton
          onPress={() => {
            if (expression) {
              const last = expression[expression.length - 1]
              if (last !== '-') {
                handlePress('-')
              }
            } else handlePress('-')
          }}
          isHighlight
        >
          <IconMinus stroke={2} />
        </CalcButton>
        <CalcButton onPress={() => handlePress('1')} label="1" />
        <CalcButton onPress={() => handlePress('2')} label="2" />
        <CalcButton onPress={() => handlePress('3')} label="3" />
        <CalcButton
          onPress={() => {
            if (expression) {
              const last = expression[expression.length - 1]
              if (last !== '+' && last !== '×' && last !== '÷') {
                handlePress('+')
              }
            }
          }}
          isHighlight
        >
          <IconPlus stroke={2} />
        </CalcButton>
        <CalcButton>
          <IconCalculator stroke={2} />
        </CalcButton>
        <CalcButton
          onPress={() => {
            if (expression) {
              handlePress('0')
            }
          }}
          label="0"
        />
        <CalcButton
          onPress={() => {
            if (expression) {
              const last = expression[expression.length - 1]
              if (last === '.') return
              if (
                last === '+' ||
                last === '-' ||
                last === '×' ||
                last === '÷'
              ) {
                handlePress('0.')
              } else handlePress('.')
            } else {
              handlePress('0.')
            }
          }}
          label="."
        />
        <CalcButton onPress={onCalculate} isHighlight>
          <IconEqual stroke={2} />
        </CalcButton>
      </div>
    </>
  )
}
