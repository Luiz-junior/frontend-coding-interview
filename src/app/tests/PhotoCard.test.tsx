import { render, screen, fireEvent } from "@testing-library/react";
import PhotoCard from "../components/PhotoCard";

const mockPhoto = {
  id: 886521,
  src: {
    medium:
      "https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  alt: "A hand painted green holds a fresh plant sprout against a light background, symbolizing growth and sustainability.",
  photographer: "Alena Koval",
  avg_color: "#DFE0D9",
  photographer_url: "https://www.pexels.com/@alena-koval-233944",
};

jest.mock("../lib/auth", () => ({
  ...jest.requireActual("../lib/auth"),
  toggleLike: jest.fn(),
}));

describe("PhotoCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders photo card with correct data", () => {
    render(
      <PhotoCard photo={mockPhoto} isLiked={false} onToggleLike={() => {}} />
    );

    expect(screen.getByAltText(mockPhoto.alt)).toBeInTheDocument();
    expect(screen.getByText(mockPhoto.photographer)).toBeInTheDocument();
    expect(screen.getByText(mockPhoto.avg_color)).toBeInTheDocument();
  });

  test("toggles like when button is clicked", () => {
    const mockOnToggleLike = jest.fn();
    render(
      <PhotoCard
        photo={mockPhoto}
        isLiked={false}
        onToggleLike={mockOnToggleLike}
      />
    );

    const likeButton = screen.getByRole("button");
    fireEvent.click(likeButton);

    expect(mockOnToggleLike).toHaveBeenCalledTimes(1);
  });
});
