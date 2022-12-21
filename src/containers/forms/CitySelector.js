import React, {useEffect, useState} from 'react';
import {getCitiesService} from '../../services/states';
import SelectPicker from '../../components/SelectPicker';
import Loading from '../../components/Loading';

export default ({onValueChange, stateId, selected}) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCities();
  }, [stateId]);

  const getCities = async () => {
    if (stateId) {
      setLoading(true);
      const cities = await getCitiesService(stateId);
      setCities(
        cities.map(state => ({
          label: state.name,
          value: state.id,
          itemKey: state.id,
        })),
      );
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <SelectPicker
      useNativeAndroidPickerStyle={false}
      placeholder={{label: 'Selecione a cidade', value: '', color: '#9EA0A4'}}
      onValueChange={onValueChange}
      value={selected}
      items={cities}
    />
  );
};
