using Microsoft.AspNetCore.Mvc;

namespace CryptoProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CryptoController : ControllerBase
    {
        [HttpPost("echo")]
        public IActionResult Echo([FromBody] MessageDto dto)
        {
            // Þimdilik sadece gelen mesajý geri gönderiyoruz
            return Ok(new { received = dto.Text });
        }
    }

    public class MessageDto
    {
        public string Text { get; set; } = "";
    }
}
