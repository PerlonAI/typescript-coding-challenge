import { assertTrue } from "../test/assert";

/**
 * Part 2: Smart Parking System (~20 min)
 *
 * Fixed layout:
 * - Floors 1..5, Spots 1..20 each (100 total)
 * - On every floor: 1–8 'compact', 9–16 'standard', 17–20 'large'
 *
 * Compatibility:
 * - compact car → compact/standard/large
 * - standard car → standard/large
 * - large car → large only
 *
 * Preference:
 * - Prefer lowest floor, then lowest spot
 * - Preferred floor (optional): try it first; otherwise global best
 * - While any standard exists, standard cars should consume standard (not large)
 *
 * Identity & errors:
 * - Cars identified by carId; cannot be parked twice
 * - parkCar returns null if no compatible spot or car already parked
 * - removeCar returns false if car not found
 */
export type SpotSize = "compact" | "standard" | "large";
export type CarSize = "compact" | "standard" | "large";
export type SpotLocation = [number, number]; // [floor, spot]

export interface ParkingSpot {
  floor: number;
  spot: number;
  size: SpotSize;
  carId?: string;
}

export class ParkingGarage {
  private spots: Map<string, ParkingSpot> = new Map(); // key: `${floor}:${spot}`
  private carIndex: Map<string, string> = new Map(); // carId -> spotKey

  constructor() {
    this.initializeGarage();
  }

  private key(floor: number, spot: number): string {
    return `${floor}:${spot}`;
  }

  private initializeGarage(): void {
    // TODO: Build the exact layout per spec (5 floors x 20 spots, sizes by range)
  }

  private compatible(car: CarSize, spot: SpotSize): boolean {
    // TODO: Implement compatibility rules above
    return false;
  }

  /**
   * Find an optimal free spot per rules. Does NOT park the car.
   * - Preferred floor first (if provided), then lowest floor/spot globally
   * - Prefer 'standard' over 'large' for standard cars while any standard exists
   */
  findOptimalSpot(
    _carSize: CarSize,
    _preferredFloor?: number
  ): SpotLocation | null {
    // TODO
    return null;
  }

  parkCar(
    _carId: string,
    _carSize: CarSize,
    _preferredFloor?: number
  ): SpotLocation | null {
    // TODO: Reject duplicates; find spot; mark occupied; update indexes
    return null;
  }

  removeCar(_carId: string): boolean {
    // TODO: Unpark by carId; return true if removed, false if not found
    return false;
  }

  getOccupancyStatus(): { total: number; occupied: number; available: number } {
    // TODO: Compute totals (simple scan is fine)
    return { total: this.spots.size, occupied: 0, available: this.spots.size };
  }
}

// Tests (do not modify)
export function testParkingSystem(): void {
  const g = new ParkingGarage();
  const status0 = g.getOccupancyStatus();
  assertTrue("100 total spots", status0.total === 100);
  assertTrue("initial occupied is 0", status0.occupied === 0);

  const before = g.getOccupancyStatus().occupied;
  const p1 = g.parkCar("car-1", "compact");
  const after = g.getOccupancyStatus().occupied;
  assertTrue(
    "compact parked increments occ",
    p1 !== null && after === before + 1
  );

  const dup = g.parkCar("car-1", "compact");
  assertTrue("duplicate park rejected", dup === null);

  assertTrue("remove existing returns true", g.removeCar("car-1") === true);
  assertTrue("remove again returns false", g.removeCar("car-1") === false);

  for (let i = 0; i < 5; i++) {
    const sLoc = g.parkCar(`std-${i}`, "standard");
    assertTrue("standard car assigned a spot", sLoc !== null);
    if (sLoc) {
      const [, spot] = sLoc;
      assertTrue(
        "standard uses standard before large",
        spot >= 9 && spot <= 16
      );
    }
  }

  for (let i = 0; i < 3; i++) {
    const lLoc = g.parkCar(`lg-${i}`, "large");
    assertTrue("large car assigned a spot", lLoc !== null);
    if (lLoc) {
      const [, spot] = lLoc;
      assertTrue("large uses large spots", spot >= 17 && spot <= 20);
    }
  }
}
