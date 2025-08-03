import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInForm from "../components/SignInForm";
import axios from "axios";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("SignInForm", () => {
  const setError = jest.fn();
  const setUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.post.mockResolvedValue({ data: { success: true } });
  });

  test("submits form with valid credentials", async () => {
    render(<SignInForm setError={setError} setUser={setUser} />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "user@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/login",
        {
          email: "user@email.com",
          password: "123",
        }
      );
      expect(setUser).toHaveBeenCalled();
    });
  });

  test("handles invalid credentials", async () => {
    mockAxios.post.mockRejectedValueOnce({
      response: { data: { error: "Invalid Credentials" } },
    });

    render(<SignInForm setError={setError} setUser={setUser} />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wrong@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/login",
        {
          email: "wrong@email.com",
          password: "wrong",
        }
      );
      expect(setError).toHaveBeenCalledWith("Invalid Credentials");
    });
  });
});
