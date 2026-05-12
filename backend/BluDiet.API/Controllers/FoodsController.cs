using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BluDiet.API.Data;
using BluDiet.API.Models;

namespace BluDiet.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoodsController : ControllerBase
{
    private readonly AppDbContext _context;

    public FoodsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/foods?search=pollo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Food>>> GetFoods([FromQuery] string? search)
    {
        var query = _context.Foods.AsQueryable();

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(f => f.NameEs.ToLower().Contains(search.ToLower()));
        }

        // Se limita a 50 resultados por la performance
        return await query.Take(50).ToListAsync();
    }

    // GET: api/foods/{id}
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Food>> GetFood(Guid id)
    {
        var food = await _context.Foods.FindAsync(id);

        if (food == null) return NotFound();

        return food;
    }
}