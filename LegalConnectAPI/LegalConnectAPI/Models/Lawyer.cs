namespace LegalConnectAPI.Models
{
    public class Lawyer
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Specialization { get; set; }
        public int Experience { get; set; } // years
    }
}