import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { MemoryRouter } from "react-router-dom";
import { store } from "../store/configureStore";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

test('renders sign in buttom', () => {
    render(
      <Provider store={store}>
        <SnackbarProvider>
          <MemoryRouter initialEntries={['/dashboard']}>
            <App authenticate ={{authenticated: false}}/> 
          </MemoryRouter>
        </SnackbarProvider>
      </Provider>
    );
    const buttonElement = screen.getByTestId('signin-button');
    expect(buttonElement).toBeTruthy();
});
