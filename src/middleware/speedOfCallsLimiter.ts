import envValues from "../config/envConfig";
import slowDown from "express-slow-down";

/**
 * Increase the call response time after a certain number of calls.
 */
const speedOfCallsLimiter = slowDown({
  windowMs: envValues.SpeedLimitTimeWindow,
  delayAfter: envValues.SpeedLimiteDelayAfter,
  delayMs: () => 1000,
});

export default speedOfCallsLimiter;
