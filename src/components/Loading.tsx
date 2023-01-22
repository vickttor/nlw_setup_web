import { CircleNotch } from "phosphor-react";

interface LoadingProps {
  size?: number
}

export function Loading({size = 40}: LoadingProps) {
  return (
    <CircleNotch size={size} color="#7c3aed" className="animate-spin mx-auto my-4" weight="bold"/>
  )
}