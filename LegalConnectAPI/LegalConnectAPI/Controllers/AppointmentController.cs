using Microsoft.AspNetCore.Mvc;
using LegalConnectAPI.Data;
using LegalConnectAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace LegalConnectAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ CLIENT: Book appointment WITH VALIDATION + DUPLICATE CHECK
        [HttpPost("book")]
        [Authorize]
        public IActionResult Book(Appointment appointment)
        {
            // 🔐 Get logged-in user email from JWT
            var email = User.Claims.FirstOrDefault(c => c.Type.Contains("email"))?.Value;

            if (email == null)
                return Unauthorized("Invalid user");

            // ❌ Validate required fields
            if (string.IsNullOrEmpty(appointment.LawyerName) ||
                string.IsNullOrEmpty(appointment.TimeSlot))
            {
                return BadRequest("Please select lawyer and time slot ❌");
            }

            // ❌ Prevent double booking
            var exists = _context.Appointments.Any(a =>
                a.Date.Date == appointment.Date.Date &&
                a.TimeSlot == appointment.TimeSlot &&
                a.LawyerName == appointment.LawyerName
            );

            if (exists)
                return BadRequest("This time slot is already booked ❌");

            // ✅ Backend-controlled fields
            appointment.Email = email;
            appointment.Status = "Pending";

            _context.Appointments.Add(appointment);
            _context.SaveChanges();

            return Ok("Appointment booked ✅");
        }

        // ✅ CLIENT: View own appointments
        [HttpGet("my")]
        [Authorize]
        public IActionResult MyAppointments()
        {
            var email = User.Claims.FirstOrDefault(c => c.Type.Contains("email"))?.Value;

            var appointments = _context.Appointments
                .Where(a => a.Email == email)
                .OrderByDescending(a => a.Date)
                .ToList();

            return Ok(appointments);
        }

        // 👑 ADMIN: View all appointments
        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public IActionResult AllAppointments()
        {
            var appointments = _context.Appointments
                .OrderByDescending(a => a.Date)
                .ToList();

            return Ok(appointments);
        }

        // 👑 ADMIN: Update status
        [HttpPut("status/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateStatus(int id, [FromBody] string status)
        {
            var appointment = _context.Appointments.Find(id);

            if (appointment == null)
                return NotFound("Appointment not found");

            if (string.IsNullOrEmpty(status))
                return BadRequest("Invalid status");

            appointment.Status = status;
            _context.SaveChanges();

            return Ok("Status updated ✅");
        }

        // 🧠 NEW: Get booked slots (IMPORTANT FOR FRONTEND)
        [HttpGet("slots")]
        [Authorize]
        public IActionResult GetBookedSlots(string lawyerName, DateTime date)
        {
            if (string.IsNullOrEmpty(lawyerName))
                return BadRequest("Lawyer name required");

            var bookedSlots = _context.Appointments
                .Where(a =>
                    a.LawyerName == lawyerName &&
                    a.Date.Date == date.Date
                )
                .Select(a => a.TimeSlot)
                .ToList();

            return Ok(bookedSlots);
        }

        [HttpPost("upload/{id}")]
        [Authorize]
        public async Task<IActionResult> UploadDocument(int id, IFormFile file, [FromForm] string caseDetails)
        {
            var appointment = _context.Appointments.Find(id);

            if (appointment == null)
                return NotFound("Appointment not found");

            if (file != null)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine("Uploads", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                appointment.DocumentPath = filePath;
            }

            appointment.CaseDetails = caseDetails;

            _context.SaveChanges();

            return Ok("Uploaded successfully ✅");
        }
    }
}