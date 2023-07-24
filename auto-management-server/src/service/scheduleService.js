const Schedule = require("../models/Schedule");
const { handleError } = require("../utils");

const scheduleService = {
  createSchedule: async (req, res) => {
    const {dateTimePicker, fullname, phoneNumber} = req.body
    try {
      const newSchedule = new Schedule({
        dateTimePicker,
        fullname,
        phoneNumber
      });
      const savedSchedule = await newSchedule.save();
      res.status(200).json(savedSchedule)
    } catch (error) {
        console.log(error.message);
      handleError(error, res, "Failed to create schedule");
    }
  },

  getAllSchedules: async (req, res) => {
    try {
      const schedules = await Schedule.find();
    res.status(200).json(schedules)
    } catch (error) {
      handleError(error, res, "Failed to fetch schedules");
    }
  },
  updateSchedule: async (req, res) => {
    const { scheduleId } = req.params;
    const { dateTimePicker, fullname, phoneNumber } = req.body;

    try {
      const existingSchedule = await Schedule.findById(scheduleId);

      if (!existingSchedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }

      existingSchedule.dateTimePicker = dateTimePicker;
      existingSchedule.fullname = fullname;
      existingSchedule.phoneNumber = phoneNumber;

      const updatedSchedule = await existingSchedule.save();
      res.status(200).json(updatedSchedule);
    } catch (error) {
      handleError(error, res, 'Failed to update schedule');
    }
  },

};

module.exports = scheduleService;