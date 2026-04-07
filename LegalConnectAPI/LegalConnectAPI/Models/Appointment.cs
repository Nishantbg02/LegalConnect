using System;

namespace LegalConnectAPI.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        public string? ClientName { get; set; }
        public string? Email { get; set; }

        public DateTime Date { get; set; }

        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected

        public string? LawyerName { get; set; }
        public string? TimeSlot { get; set; }
        public string? CaseDetails { get; set; }
        public string? DocumentPath { get; set; } // file path
    }
}