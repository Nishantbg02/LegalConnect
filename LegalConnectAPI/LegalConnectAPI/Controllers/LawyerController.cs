using Microsoft.AspNetCore.Mvc;
using LegalConnectAPI.Data;
using LegalConnectAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace LegalConnectAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LawyerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LawyerController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET ALL LAWYERS (PUBLIC)
        [HttpGet]
        public IActionResult GetLawyers()
        {
            var lawyers = _context.Lawyers.ToList();
            return Ok(lawyers);
        }

        // ✅ ADD LAWYER (ADMIN ONLY - optional now)
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult AddLawyer(Lawyer lawyer)
        {
            _context.Lawyers.Add(lawyer);
            _context.SaveChanges();

            return Ok(lawyer);
        }
    }
}