import { Switch } from '@headlessui/react'
import { useState } from 'react'

interface ToggleProps {
    name: string;
    defaultChecked?: boolean;
}

export default function Toggle({ name, defaultChecked }: ToggleProps) {
    const [enabled, setEnabled] = useState(defaultChecked || false)

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            name={name} // <-- Esto crea el input oculto para el FormData
            value="on"  // <-- Valor que enviará cuando esté activo
            className={`${
                enabled ? 'bg-blue-brand' : 'bg-gray-300'
            } relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-brand/50`}
        >
            <span
                aria-hidden="true"
                className={`${
                    enabled ? 'translate-x-4' : 'translate-x-0'
                } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    )
}