import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { materialTheme } from '../../constants/'


export const RadioButtonCustomers = ({ customers, valueSelected,selected}) => {
	const [value, setvalue] = React.useState('');

	React.useEffect(() => {
		console.log('Se cambio el cliente');
	console.log(selected);
	}, [selected])


	return (

		<View>
			
			{customers.map(res => {
				return (
					<TouchableOpacity
						onPress={() => {
							valueSelected(res);
							setvalue(res.id)
						}}
					>
						<View key={res.id} style={styles.container}>
					<Text style={styles.radioText}>Nombre:{res.name}/NIT:{res.NIT}</Text>
							<View
								style={styles.radioCircle}
								onPress={() => {
									valueSelected(res);
									setvalue(res.id)
								}}>
								{selected.id == res.id && <View style={styles.selectedRb} />}
								
							</View>
						</View>
					</TouchableOpacity>

				);
			})}
		
		</View>

	)

}

export default class RadioButton extends Component {
	state = {
		value: null,
	};

	render() {
		const { PROP } = this.props;
		const { value } = this.state;

		return (
			<View>
				{PROP.map(res => {
					return (
						<TouchableOpacity
							onPress={() => {
								this.setState({
									value: res.key,
								});
							}}
						>
							<View key={res.key} style={styles.container}>
								<Text style={styles.radioText}>{res.text}</Text>
								<TouchableOpacity
									style={styles.radioCircle}
									onPress={() => {
										this.setState({
											value: res.key,
										});
									}}>
									{value === res.key && <View style={styles.selectedRb} />}
								</TouchableOpacity>
							</View>
						</TouchableOpacity>

					);
				})}
				<Text> Selected: {this.state.value} </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 5,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: '#f7f7f7',
		borderBottomWidth: 2,
		padding: 10
	},
	radioText: {
		marginRight: 35,
		fontSize: 16,
		color: '#555',
		fontWeight: '700'
	},
	radioCircle: {
		height: 15,
		width: 15,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: materialTheme.colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 9,
		height: 9,
		borderRadius: 50,
		backgroundColor: materialTheme.colors.primary,
	},
	result: {
		marginTop: 5,
		color: 'white',
		fontWeight: '600',
		backgroundColor: '#F3FBFE',
	},
});