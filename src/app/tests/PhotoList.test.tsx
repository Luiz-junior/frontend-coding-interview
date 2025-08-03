import { render, screen, fireEvent } from "@testing-library/react";
import PhotoList from "../components/PhotoList";
import * as authLib from "../lib/auth";

const mockPhotos = [
  {
    id: 2325447,
    src: {
      medium:
        "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg?auto=compress&cs=tinysrgb&h=350",
    },
    alt: "Hot air balloons float over the mesmerizing landscape of Cappadocia, Turkey at sunrise.",
    photographer: "Francesco Ungaro",
    avg_color: "#85928B",
    photographer_url: "https://www.pexels.com/@francesco-ungaro",
  },
  {
    id: 886521,
    src: {
      medium:
        "https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&h=350",
    },
    alt: "A hand painted green holds a fresh plant sprout against a light background, symbolizing growth and sustainability.",
    photographer: "Alena Koval",
    avg_color: "#DFE0D9",
    photographer_url: "https://www.pexels.com/@alena-koval-233944",
  },
];

describe("PhotoList", () => {
  beforeEach(() => {
    jest.spyOn(authLib, "getLikedPhotos").mockReturnValue([]);
    jest.spyOn(authLib, "toggleLike").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders photo cards correctly", () => {
    render(<PhotoList photos={mockPhotos} />);

    expect(screen.getAllByRole("img", { name: /photo/i }).length).toBe(2);
    expect(screen.getByText("Francesco Ungaro")).toBeInTheDocument();
    expect(screen.getByText("Alena Koval")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(2);
  });

  test("toggles like when button is clicked", () => {
    render(<PhotoList photos={mockPhotos} />);

    const likeButtons = screen.getAllByRole("button");
    fireEvent.click(likeButtons[0]);

    expect(authLib.toggleLike).toHaveBeenCalledWith("2325447");
    expect(authLib.toggleLike).toHaveBeenCalledTimes(1);
  });
});
