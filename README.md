# react-modal-dom


### Lightweight and customizable modal with react

We do not limit you with html markup. You can create responsive modal windows of absolutely any format and manage them from anywhere in your react application.

### Installation
```javascript
npm i react-modal-dom
# or
yarn add react-modal-dom
```

### Demo

Check out the demo here https://react-modal-dom.netlify.app/

```
Note!
Use only one 'ModalComponent' component in the app.
```

### Usage

> Step 1 - add "ModalComponent" into your index.js file. 

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ModalComponent from 'react-modal-dom';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ModalComponent />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

> Step 2 - create your custom modal window

```javascript
const MyModal = () => {
  return (
    <div className='modal'>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  );
};

export default MyModal;
```

> Step 3 - use css to create styles for your modal

```css
/* example */
.modal {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
}
```

> Step 4 - use "modal" obj methods to close or open your modal window
```javascript
import React from 'react';
import { modal } from 'react-modal-dom';

import MyModal from '../MyModal';

const MyApp = () => {
  const handleOpenModal = () => {
    modal.open(<MyModal/>)
  }
  return (
    <>
      <button type="button" onClick={handleOpenModal}>
        Open modal
      </button>
      <button type="button" onClick={modal.close}>
        Close modal
      </button>
    </>
  );
};

export default MyApp;
```

Use "modal" obj methods even in your redux actions

```javascript
import { modal } from 'react-modal-dom';

export const myAction = () => async dispatch => {
  dispatch({ type: 'START' });
  try {
    const { data, status } = await axios.get('...');
    if (status < 200 && status >= 300) throw new Error();
    dispatch({ type: 'SUCCESS', payload: data });

    // close modal here
    modal.close();
    
  } catch (error) {
    dispatch({ type: 'FAILURE' });
};
```

```javascript
import { modal } from 'react-modal-dom';

function* myWatcher() {
  try {
    const { data, status } = await axios.get('...');
    if (status < 200 || status >= 300) throw new Error();
    yield put({ type: 'SUCCESS', payload: data });

    // close modal here
    modal.close();

  } catch (error) {
    yield put({ type: 'FAILURE' });
  }
}
```