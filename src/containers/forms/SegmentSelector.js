import React, {useEffect, useState} from 'react';
import {getSegmentsService} from '../../services/states';
import SelectPicker from '../../components/SelectPicker';
import Loading from '../../components/Loading';

export default ({onValueChange, stateId, selected}) => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSegments();
  }, [stateId]);

  const getSegments = async () => {
      setLoading(true);
      const segments = await getSegmentsService();
      setSegments(
        segments.map(segment => ({
          label: segment.name,
          value: segment.id,
          itemKey: segment.id,
        })),
      );
      setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <SelectPicker
      useNativeAndroidPickerStyle={false}
      placeholder={{label: 'Selecione o segmento', value: '', color: '#9EA0A4'}}
      onValueChange={onValueChange}
      value={selected}
      items={segments}
    />
  );
};
