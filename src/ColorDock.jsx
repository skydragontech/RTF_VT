import React, { useState } from "react";
import { Dock } from 'primereact/dock';
import { ColorPicker } from 'primereact/colorpicker';

export default function ColorDock({
    color,
    setColor
}) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const gradients = [
        'linear-gradient(135deg, #eaffd0 0%, #96e6a1 40%)',
        'linear-gradient(135deg, #b8ffe3 0%, #487C1C 40%)',
        'linear-gradient(135deg, #d2fff2 0%, #8fd3f4 40%)',
        'linear-gradient(135deg, #b3eaff 0%, #00f2fe 40%)',
        'linear-gradient(135deg, #aee7ff 0%, #0057b8 40%)',
        'linear-gradient(135deg, #e3f0ff 0%, #c2e9fb 40%)',
        'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 40%)',
        'linear-gradient(135deg, #b3eaff 0%, #330867 40%)',
        'linear-gradient(135deg, #e6e6fa 0%, #b490ca 40%)',
        'linear-gradient(135deg, #ffe6d1 0%, #d57eeb 40%)',
        'linear-gradient(135deg, #f3e6ff 0%, #fbc2eb 40%)',
        'linear-gradient(135deg, #ffe6fa 0%, #e6dee9 40%)',
        'linear-gradient(135deg, #e6f0ff 0%, #a6c1ee 40%)',
        'linear-gradient(135deg, #b3ffe6 0%, #185a9d 40%)',
        'linear-gradient(135deg, #ffb6d5 0%, #ff5858 40%)',
        'linear-gradient(135deg, #fbc6fa 0%, #f5576c 40%)',
        'linear-gradient(135deg, #fff6e5 0%, #fcb69f 40%)',
        'linear-gradient(135deg, #ffe9b3 0%, #ffd200 40%)',
        'linear-gradient(135deg, #ffe7b2 0%, #fda085 40%)',
        'linear-gradient(135deg, #ffd1e3 0%, #fa709a 40%)',
    ];
    const solidColors = [
        '#96e6a1', '#487C1C', '#8fd3f4', '#00f2fe',
        '#0057b8', '#c2e9fb', '#8ec5fc', '#330867', '#b490ca', '#d57eeb', '#fbc2eb', '#e6dee9', '#a6c1ee', '#185a9d',
        '#ff5858', '#f5576c', '#fcb69f', '#ffd200', '#fda085', '#fa709a',
    ];
    const items = [
        ...Array.from({length: 20}).map((_, i) => ({
            icon: () => (
                <div className={"p-dock-item-container"} style={{position: 'relative'}}>
                    <span
                        className="dock-color-pie"
                        style={
                            i === 0
                                ? {
                                    background: `${color}` //url(https://gamemcu.com/su7/1.0.5/icon/custom.webp) center/100% no-repeat`,
                                }
                                : {
                                    background: gradients[i % gradients.length],
                                }
                        }
                    />
                    {activeIndex === i && (
                        <span className="bar-circle"/>
                    )}
                </div>
            ),
            command: () => {
                if (i === 0) {
                    setShowColorPicker(v => !v);
                } else {
                    setColor(solidColors[i % solidColors.length]);
                    setShowColorPicker(false);
                }
                setActiveIndex(i);
            },
        }))
    ];
    return (
        <div className={'dock-container'}>
            <Dock model={items} position='left' magnification={false}/>
            {showColorPicker && (
                <div className="colorpicker-popup">
                    <ColorPicker
                        format="hex"
                        value={color.replace('#', '')}
                        onChange={e => setColor('#' + e.value)}
                        inline={true}
                    />
                </div>
            )}
        </div>
    );
}
