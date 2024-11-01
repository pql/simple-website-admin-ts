import provinces from './china-division/provinces.json';
import cities from './china-division/cities.json';
import areas from './china-division/areas.json';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

areas.forEach((area) => {
  const matchCity = cities.filter((city) => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    const { name, code } = area;
    matchCity.children.push({
      label: name,
      value: code,
    } as Option as never);
  }
});

cities.forEach((city) => {
  const matchProvince = provinces.filter((province) => province.code === city.provinceCode)[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children,
    } as Option as never);
  }
});

const provinceCityOptions = provinces.map((province) => ({
  label: province.name,
  value: province.code,
  children: province.children,
}));

export default provinceCityOptions;
