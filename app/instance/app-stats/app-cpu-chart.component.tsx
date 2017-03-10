import * as React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import * as dateFormat from 'dateformat';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { get, takeRight } from 'lodash';
import { LoadingComponent } from '../../common/loading.component';
import { chartLineColors } from './charLinesColors.constants';

let cpuChartData = [];
let latestCpu = [];

interface props {
	appStats: any;
	guid: string;
}

export class AppCpuChartComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	componentWillUnmount() {
		cpuChartData = [];
	}

	componentDidUpdate() {
		let cpus = Object.keys(this.props.appStats.stats).map((key) => {
			let cpu: number = this.props.appStats.stats[key].stats.usage.cpu * 100;
			return { cpu: parseFloat(cpu.toFixed(2)), instance: key };
		});

		let memoryUpdate = takeRight(cpuChartData, 20);
		let newCpu = { name: dateFormat(new Date(), 'HH:MM:ss') };
		latestCpu = cpus;

		cpus.forEach((cpu) => {
			newCpu[cpu.instance] = cpu.cpu;
		});

		memoryUpdate.push(newCpu);
		cpuChartData = memoryUpdate;
	}

	render() {
		return (
			<Card>
				<CardHeader title="CPU" />
				<CardText style={{ height: 300 }}>
					{
						cpuChartData.length > 1 ? (
							<ResponsiveContainer width={'100%'} height={300}>
								<LineChart data={cpuChartData}
									height={200}
									margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
									<XAxis dataKey="name" />
									<YAxis />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									<Legend />
									{
										latestCpu.map((mem, key) => {
											return <Line key={key} isAnimationActive={false}
												type="monotone"
												dataKey={key}
												activeDot={{ r: 8 }}
												stroke={chartLineColors[key]} />
										})
									}
								</LineChart>
							</ResponsiveContainer>
						) : (
								<div style={{ height: 150, textAlign: 'center' }}>
									<LoadingComponent />
								</div>
							)
					}
				</CardText>
			</Card>
		)
	}
}

