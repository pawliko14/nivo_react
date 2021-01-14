
// import React, { Component, useState, useEffect } from 'react'
// import range from 'lodash/range'
// import last from 'lodash/last'
// import { storiesOf } from '@storybook/react'
// import { withKnobs, boolean, select } from '@storybook/addon-knobs'
// import { generateDrinkStats } from '@nivo/generators'
// import { Defs, linearGradientDef } from '@nivo/core'
// import { area, curveMonotoneX } from 'd3-shape'
// import * as time from 'd3-time'
// import { timeFormat } from 'd3-time-format'
// import { Line } from '../src'

// const data = generateDrinkStats(18)
// const commonProperties = {
//     width: 900,
//     height: 400,
//     margin: { top: 20, right: 20, bottom: 60, left: 80 },
//     data,
//     animate: true,
//     enableSlices: 'x',
// }

// const curveOptions = ['linear', 'monotoneX', 'step', 'stepBefore', 'stepAfter']

// const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
//     <g>
//         <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
//         <circle
//             r={size / 5}
//             strokeWidth={borderWidth}
//             stroke={borderColor}
//             fill={color}
//             fillOpacity={0.35}
//         />
//     </g>
// )

// const stories = storiesOf('Line', module)

// stories.addDecorator(withKnobs)



// class RealTimeChart extends Component {
//     constructor(props) {
//         super(props)

//         const date = new Date()
//         date.setMinutes(0)
//         date.setSeconds(0)
//         date.setMilliseconds(0)

//         this.state = {
//             dataA: range(100).map(i => ({
//                 x: time.timeMinute.offset(date, i * 30),
//                 y: 10 + Math.round(Math.random() * 20),
//             })),
//             dataB: range(100).map(i => ({
//                 x: time.timeMinute.offset(date, i * 30),
//                 y: 30 + Math.round(Math.random() * 20),
//             })),
//             dataC: range(100).map(i => ({
//                 x: time.timeMinute.offset(date, i * 30),
//                 y: 60 + Math.round(Math.random() * 20),
//             })),
//         }

//         this.formatTime = timeFormat('%Y %b %d')
//     }

//     componentDidMount() {
//         this.timer = setInterval(this.next, 100)
//     }

//     componentWillUnmount() {
//         clearInterval(this.timer)
//     }

//     next = () => {
//         const dataA = this.state.dataA.slice(1)
//         dataA.push({
//             x: time.timeMinute.offset(last(dataA).x, 30),
//             y: 10 + Math.round(Math.random() * 20),
//         })
//         const dataB = this.state.dataB.slice(1)
//         dataB.push({
//             x: time.timeMinute.offset(last(dataB).x, 30),
//             y: 30 + Math.round(Math.random() * 20),
//         })
//         const dataC = this.state.dataC.slice(1)
//         dataC.push({
//             x: time.timeMinute.offset(last(dataC).x, 30),
//             y: 60 + Math.round(Math.random() * 20),
//         })

//         this.setState({ dataA, dataB, dataC })
//     }

//     render() {
//         const { dataA, dataB, dataC } = this.state

//         return (
//             <Line
//                 {...commonProperties}
//                 margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
//                 data={[
//                     { id: 'A', data: dataA },
//                     { id: 'B', data: dataB },
//                     { id: 'C', data: dataC },
//                 ]}
//                 xScale={{ type: 'time', format: 'native' }}
//                 yScale={{ type: 'linear', max: 100 }}
//                 axisTop={{
//                     format: '%H:%M',
//                     tickValues: 'every 4 hours',
//                 }}
//                 axisBottom={{
//                     format: '%H:%M',
//                     tickValues: 'every 4 hours',
//                     legend: `${this.formatTime(dataA[0].x)} ——— ${this.formatTime(last(dataA).x)}`,
//                     legendPosition: 'middle',
//                     legendOffset: 46,
//                 }}
//                 axisRight={{}}
//                 enablePoints={false}
//                 enableGridX={true}
//                 curve="monotoneX"
//                 animate={false}
//                 motionStiffness={120}
//                 motionDamping={50}
//                 isInteractive={false}
//                 enableSlices={false}
//                 useMesh={true}
//                 theme={{
//                     axis: { ticks: { text: { fontSize: 14 } } },
//                     grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
//                 }}
//             />
//         )
//     }
// }

// stories.add('real time chart', () => <RealTimeChart />)


// const AreaLayer = ({ series, xScale, yScale, innerHeight }) => {
//     const areaGenerator = area()
//         .x(d => xScale(d.data.x))
//         .y0(d => Math.min(innerHeight, yScale(d.data.y - 40)))
//         .y1(d => yScale(d.data.y + 10))
//         .curve(curveMonotoneX)

//     return (
//         <>
//             <Defs
//                 defs={[
//                     {
//                         id: 'pattern',
//                         type: 'patternLines',
//                         background: 'transparent',
//                         color: '#3daff7',
//                         lineWidth: 1,
//                         spacing: 6,
//                         rotation: -45,
//                     },
//                 ]}
//             />
//             <path
//                 d={areaGenerator(series[0].data)}
//                 fill="url(#pattern)"
//                 fillOpacity={0.6}
//                 stroke="#3daff7"
//                 strokeWidth={2}
//             />
//         </>
//     )
// }

// stories.add(
//     'custom layers',
//     () => (
//         <Line
//             {...commonProperties}
//             yScale={{
//                 type: 'linear',
//                 stacked: true,
//             }}
//             data={commonProperties.data.filter(d => ['rhum', 'whisky'].includes(d.id))}
//             lineWidth={3}
//             curve="linear"
//             colors={['#028ee6', '#774dd7']}
//             enableGridX={false}
//             pointSize={12}
//             pointColor="white"
//             pointBorderWidth={2}
//             pointBorderColor={{ from: 'serieColor' }}
//             layers={[
//                 'grid',
//                 'markers',
//                 'areas',
//                 AreaLayer,
//                 'lines',
//                 'slices',
//                 'axes',
//                 'points',
//                 'legends',
//             ]}
//             theme={{
//                 crosshair: {
//                     line: {
//                         strokeWidth: 2,
//                         stroke: '#774dd7',
//                         strokeOpacity: 1,
//                     },
//                 },
//             }}
//         />
//     ),
//     {
//         info: {
//             text: `
//                 You can use the layers property to add extra layers
//                 to the line chart.
//             `,
//         },
//     }
// )

// const styleById = {
//     cognac: {
//         strokeDasharray: '12, 6',
//         strokeWidth: 2,
//     },
//     vodka: {
//         strokeDasharray: '1, 16',
//         strokeWidth: 8,
//         strokeLinejoin: 'round',
//         strokeLinecap: 'round',
//     },
//     rhum: {
//         strokeDasharray: '6, 6',
//         strokeWidth: 4,
//     },
//     default: {
//         strokeWidth: 1,
//     },
// }

// const DashedLine = ({ series, lineGenerator, xScale, yScale }) => {
//     return series.map(({ id, data, color }) => (
//         <path
//             key={id}
//             d={lineGenerator(
//                 data.map(d => ({
//                     x: xScale(d.data.x),
//                     y: yScale(d.data.y),
//                 }))
//             )}
//             fill="none"
//             stroke={color}
//             style={styleById[id] || styleById.default}
//         />
//     ))
// }

// stories.add(
//     'custom line style',
//     () => (
//         <Line
//             {...commonProperties}
//             xScale={{
//                 type: 'point',
//                 min: 'auto',
//                 max: 'auto',
//             }}
//             yScale={{
//                 type: 'linear',
//                 min: 'auto',
//                 max: 'auto',
//             }}
//             axisBottom={{
//                 orient: 'bottom',
//                 tickSize: 5,
//                 tickPadding: 5,
//                 tickRotation: 0,
//             }}
//             axisLeft={{
//                 orient: 'left',
//                 tickSize: 5,
//                 tickPadding: 5,
//                 tickRotation: 0,
//             }}
//             layers={['grid', 'markers', 'areas', DashedLine, 'slices', 'points', 'axes', 'legends']}
//         />
//     ),
//     {
//         info: {
//             text: `You can customize line styles using the 'layers' property and implement your own line rendering.`,
//         },
//     }
// )


