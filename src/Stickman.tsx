import { Group, Circle, Line } from 'react-konva'

interface StickmanProps { x: number; y: number; color?: string }

export default function Stickman({ x, y, color = '#333'}: StickmanProps) {

    return (
        <Group x={x} y={y}>
            <Circle 
                x={0} 
                y={-30} 
                radius={12} 
                stroke={color} 
                strokeWidth={3} 
            />
            
            <Line 
                points={[0, -18, 0, 20]} 
                stroke={color} 
                strokeWidth={3} 
                lineCap="round" 
            />
            
            <Line 
                points={[-15, 0, 0, -5, 15, 0]} 
                stroke={color} 
                strokeWidth={3} 
                lineCap="round" 
                lineJoin="round" 
            />
            
            <Line 
                points={[-12, 45, 0, 20, 12, 45]} 
                stroke={color} 
                strokeWidth={3} 
                lineCap="round" 
                lineJoin="round" 
            />
        </Group>
    )
}