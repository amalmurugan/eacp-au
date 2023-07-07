import { getByTestId, render, screen } from '@testing-library/react';
import Eacp from './Eacp';

test('renders without crashing', () => {
  render(<Eacp />);
});

test('renders eacp is loaded', () => {
  render(<Eacp />);
  expect(document.getElementsByClassName('content')).not.toBeNull();
});

test('renders no empty records label', () => {
  render(<Eacp />);
  expect(screen.queryAllByTestId('record')).not.toBeNull();

});

test('renders no empty band name', () => {
  render(<Eacp />);
  expect(screen.queryAllByTestId('band')).not.toBeNull();
});

test('renders no duplicate record labels', () => {
  render(<Eacp />);
  const recordslabels = document.getElementsByClassName('record')
  let array = []
  var status = 'success'
  for (var i = 0; i < recordslabels.length; ++i) {
    var item = recordslabels[i];
    var value = item.innerHTML
    if (array.indexOf(value) > -1) {
      status = 'failed'
      break
    }
    array.push(value)
  }
  expect(status).toBe('success')
});
