import { MutableRefObject, useEffect } from 'react'
import { useTransition } from 'remix'

export function useFormReset(
  formRef: MutableRefObject<HTMLFormElement | null>
) {
  const transition = useTransition()
  const submitting = transition.state === 'submitting'

  useEffect(() => {
    if (!submitting) {
      formRef.current?.reset()
    }
  }, [formRef, submitting])
}
