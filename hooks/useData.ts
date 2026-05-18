import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'

export function useData<T>(endpoint: string, options?: { autoRefresh?: number }) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error('Failed to fetch data')
      const result = await res.json()
      setData(Array.isArray(result) ? result : [])
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching data'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
    
    if (options?.autoRefresh) {
      const interval = setInterval(fetchData, options.autoRefresh)
      return () => clearInterval(interval)
    }
  }, [fetchData, options?.autoRefresh])

  return { data, loading, error, refetch: fetchData }
}

export function useCreate<T>(endpoint: string) {
  const [loading, setLoading] = useState(false)

  const create = useCallback(async (payload: T) => {
    setLoading(true)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create')
      const result = await res.json()
      toast.success('Created successfully')
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Creation failed'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  return { create, loading }
}

export function useUpdate<T>(endpoint: string) {
  const [loading, setLoading] = useState(false)

  const update = useCallback(async (id: string, payload: Partial<T>) => {
    setLoading(true)
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to update')
      const result = await res.json()
      toast.success('Updated successfully')
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Update failed'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  return { update, loading }
}

export function useDelete(endpoint: string) {
  const [loading, setLoading] = useState(false)

  const deleteItem = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this?')) return

    setLoading(true)
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success('Deleted successfully')
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Delete failed'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  return { deleteItem, loading }
}
