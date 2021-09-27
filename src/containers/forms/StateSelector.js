import React from 'react';
import SelectPicker from '../../components/SelectPicker';
import Loading from '../../components/Loading';
import {useSelector} from 'react-redux';

export default ({onValueChange, selected}) => {
  const {states} = useSelector(store => store.states);

  if (!states) return <Loading />;

  return (
    <SelectPicker
      useNativeAndroidPickerStyle={false}
      placeholder={{label: 'Selecione', value: '', color: '#9EA0A4'}}
      onValueChange={onValueChange}
      value={selected}
      items={states.map(state => ({
        label: state.uf,
        value: state.id,
        itemKey: state.id,
      }))}
    />
  );
};
