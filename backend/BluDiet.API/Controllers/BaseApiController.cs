using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace BluDiet.API.Controllers;

[ApiController]
public class BaseApiController : ControllerBase
{
    /// <summary>
    /// Recupera el ID único del usuario de Supabase autenticado en la petición actual.
    /// </summary>
    protected string? CurrentUserId => User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
}