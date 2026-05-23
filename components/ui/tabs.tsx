"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps {
  defaultValue: string
  children: React.ReactNode
  className?: string
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue)

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { activeTab, setActiveTab })
        }
        return child
      })}
    </div>
  )
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn("inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 p-1 text-zinc-400", className)}>
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
  activeTab?: string
  setActiveTab?: (value: string) => void
}

export function TabsTrigger({ value, children, className, activeTab, setActiveTab }: TabsTriggerProps) {
  const isActive = activeTab === value
  return (
    <button
      onClick={() => setActiveTab?.(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all",
        isActive ? "bg-white text-black shadow-sm" : "hover:bg-zinc-800 hover:text-white",
        className
      )}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
  activeTab?: string
}

export function TabsContent({ value, children, className, activeTab }: TabsContentProps) {
  if (activeTab !== value) return null
  return <div className={cn("mt-4", className)}>{children}</div>
}