import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { getTableData } from "./services";

jest.mock("./services", () => ({
  getTableData: jest.fn(),
}));

const mockTableData = [
  { "s.no": 10, "percentage.funded": 60, "amt.pledged": 2000 },
  { "s.no": 21, "percentage.funded": 70, "amt.pledged": 3000 },
  { "s.no": 32, "percentage.funded": 80, "amt.pledged": 4000 },
  { "s.no": 43, "percentage.funded": 990, "amt.pledged": 5000 },
  { "s.no": 54, "percentage.funded": 777, "amt.pledged": 1500 },
  { "s.no": 65, "percentage.funded": 77, "amt.pledged": 1100 },
  { "s.no": 75, "percentage.funded": 717, "amt.pledged": 1600 },
  { "s.no": 85, "percentage.funded": 727, "amt.pledged": 1700 },
  { "s.no": 95, "percentage.funded": 737, "amt.pledged": 1800 },
  { "s.no": 105, "percentage.funded": 747, "amt.pledged": 1900 },
];

describe("Table", () => {
  beforeEach(() => {
    (getTableData as jest.Mock).mockResolvedValue(mockTableData);
  });

  it("Render Table with data", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("S.no")).toBeInTheDocument();
      expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
      expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
    });

    expect(screen.getByText("55")).toBeInTheDocument(); // First row's S.no
    expect(screen.getByText("777")).toBeInTheDocument(); // Percentage Funded
    expect(screen.getByText("1500")).toBeInTheDocument(); // Amount Pledged
  });

  it("Pagination", async () => {
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /page 1/i,
        })
      ).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /next page/i,
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText("66")).toBeInTheDocument();
    });
  });

  it("Sorting", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("11")).toBeInTheDocument();
    });

    const sortButton = screen.getByTestId("sortSno");
    act(() => {
      fireEvent.click(sortButton!);
    });

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("106");
    });
  });

  it("Dashboard count", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Total Projects")).toBeInTheDocument();
    });

    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("Records Per Page", async () => {
    render(<App />);
    const dropdown = screen.getByTestId("dropdown");
    fireEvent.click(dropdown);

    const dropdownOptions = screen.getAllByTestId("dropdownOptions")[1];
    fireEvent.click(dropdownOptions);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      // why length is 11?
      // table's header is also considered as role = row
      expect(rows).toHaveLength(11);
    });
  });
});
