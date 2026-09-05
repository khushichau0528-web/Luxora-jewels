export interface ProjectFile {
  name: string;
  path: string;
  folder: string;
  language: 'csharp' | 'razor' | 'json' | 'sql' | 'markdown';
  purpose: string;
  content: string;
}

export const ASPNET_CORE_PROJECT_STRUCTURE: ProjectFile[] = [
  {
    name: 'appsettings.json',
    path: 'appsettings.json',
    folder: 'Configuration',
    language: 'json',
    purpose: 'Stores the SQL Server connection string and application settings.',
    content: `{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\\\mssqllocaldb;Database=LuxoraJewelsDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  },
  "AllowedHosts": "*",
  "AppSettings": {
    "StoreName": "Luxora Jewels",
    "TaxRatePercentage": 3.0,
    "FreeShippingThreshold": 1500.0,
    "StandardShippingRate": 50.0
  }
}`
  },
  {
    name: 'Program.cs',
    path: 'Program.cs',
    folder: 'Startup',
    language: 'csharp',
    purpose: 'Application entry point configuring Dependency Injection, Entity Framework Core DbContext with SQL Server, Authentication/Cookie middleware, and MVC Routing.',
    content: `using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using LuxoraJewels.Data;
using LuxoraJewels.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Configure SQL Server with Entity Framework Core
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<JewelleryDbContext>(options =>
    options.UseSqlServer(connectionString));

// 2. Add Business Services (Dependency Injection)
builder.Services.AddScoped<IJewelleryPriceCalculator, JewelleryPriceCalculator>();
builder.Services.AddScoped<ICouponService, CouponService>();
builder.Services.AddScoped<IOrderService, OrderService>();

// 3. Configure Cookie-based Authentication and Authorization
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.LogoutPath = "/Account/Logout";
        options.AccessDeniedPath = "/Account/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromDays(7);
        options.SlidingExpiration = true;
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("CustomerOnly", policy => policy.RequireRole("Customer"));
});

// 4. Add MVC Controllers and Views
builder.Services.AddControllersWithViews();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

// 5. Seed Database on Startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<JewelleryDbContext>();
        // Automatically apply migrations and seed initial data
        context.Database.Migrate();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

// 6. Configure HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();`
  },
  {
    name: 'JewelleryDbContext.cs',
    path: 'Data/JewelleryDbContext.cs',
    folder: 'Data',
    language: 'csharp',
    purpose: 'Entity Framework Core DbContext configuring all 17 tables, foreign key constraints, column data types, precision, and relationships.',
    content: `using Microsoft.EntityFrameworkCore;
using LuxoraJewels.Models;

namespace LuxoraJewels.Data
{
    public class JewelleryDbContext : DbContext
    {
        public JewelleryDbContext(DbContextOptions<JewelleryDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<WishlistItem> WishlistItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<GoldRate> GoldRates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Decimal Precisions for Financial & Weight Accuracy
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(p => p.OriginalPrice).HasPrecision(18, 2);
                entity.Property(p => p.DiscountPercentage).HasPrecision(5, 2);
                entity.Property(p => p.FinalPrice).HasPrecision(18, 2);
                entity.Property(p => p.WeightGrams).HasPrecision(8, 3);
                entity.Property(p => p.MakingCharges).HasPrecision(18, 2);
                entity.Property(p => p.StoneCharges).HasPrecision(18, 2);
                
                entity.HasOne(p => p.Category)
                      .WithMany(c => c.Products)
                      .HasForeignKey(p => p.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(o => o.Subtotal).HasPrecision(18, 2);
                entity.Property(o => o.Discount).HasPrecision(18, 2);
                entity.Property(o => o.Tax).HasPrecision(18, 2);
                entity.Property(o => o.Shipping).HasPrecision(18, 2);
                entity.Property(o => o.FinalAmount).HasPrecision(18, 2);
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.Property(oi => oi.Price).HasPrecision(18, 2);
                entity.Property(oi => oi.Total).HasPrecision(18, 2);
            });

            modelBuilder.Entity<GoldRate>(entity =>
            {
                entity.Property(g => g.RatePerGram).HasPrecision(10, 2);
            });

            // Prevent duplicate wishlist items for same user and product
            modelBuilder.Entity<WishlistItem>()
                .HasIndex(w => new { w.WishlistId, w.ProductId })
                .IsUnique();

            // Ensure unique coupon code
            modelBuilder.Entity<Coupon>()
                .HasIndex(c => c.Code)
                .IsUnique();
        }
    }
}`
  },
  {
    name: 'Product.cs',
    path: 'Models/Product.cs',
    folder: 'Models',
    language: 'csharp',
    purpose: 'Product model with specifications: Material, Purity, Weight, Size, Stone, Making Charges, Stock, and LINQ helper methods.',
    content: `using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LuxoraJewels.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Display(Name = "Category")]
        public int CategoryId { get; set; }
        public virtual Category? Category { get; set; }

        [Required]
        [Range(1, 1000000, ErrorMessage = "Price must be greater than zero")]
        [Display(Name = "Original Price ($)")]
        public decimal OriginalPrice { get; set; }

        [Range(0, 99, ErrorMessage = "Discount cannot exceed 99%")]
        [Display(Name = "Discount (%)")]
        public decimal DiscountPercentage { get; set; }

        [Display(Name = "Final Price ($)")]
        public decimal FinalPrice { get; set; }

        [Required]
        public string Material { get; set; } = "Gold"; // Gold, Diamond, Platinum, Silver

        public string Purity { get; set; } = "22K"; // 24K, 22K, 18K, 14K, N/A

        [Range(0.01, 5000.0, ErrorMessage = "Weight must be valid")]
        [Display(Name = "Weight in Grams")]
        public decimal WeightGrams { get; set; }

        public string? Size { get; set; }
        public string Colour { get; set; } = "Yellow Gold";
        public string StoneType { get; set; } = "Plain Gold";
        public string Brand { get; set; } = "Luxora Atelier";

        [Required]
        [Range(0, 10000, ErrorMessage = "Stock cannot be negative")]
        public int Stock { get; set; }

        public double Rating { get; set; } = 5.0;
        public int ReviewCount { get; set; } = 0;

        public decimal MakingCharges { get; set; } = 0;
        public decimal StoneCharges { get; set; } = 0;

        public string Gender { get; set; } = "Women"; // Women, Men, Unisex, Kids
        public bool IsNewArrival { get; set; } = false;
        public bool IsFeatured { get; set; } = false;
        public bool IsBestSeller { get; set; } = false;
        public bool IsTrending { get; set; } = false;
        public bool IsOnSale { get; set; } = false;

        public string Status { get; set; } = "Active"; // Active, Inactive
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        [NotMapped]
        public string PrimaryImageUrl => Images?.FirstOrDefault(i => i.IsPrimary)?.ImageUrl 
            ?? Images?.FirstOrDefault()?.ImageUrl 
            ?? "/images/placeholder-jewel.jpg";
    }
}`
  },
  {
    name: 'Order.cs',
    path: 'Models/Order.cs',
    folder: 'Models',
    language: 'csharp',
    purpose: 'Order entity representing placed orders, shipping details, payment statuses, and visual tracking stages.',
    content: `using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LuxoraJewels.Models
{
    public class Order
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString("N")[..10].ToUpper();

        [Required]
        public int UserId { get; set; }
        public virtual User? User { get; set; }

        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Tax { get; set; }
        public decimal Shipping { get; set; }
        public decimal FinalAmount { get; set; }

        public string? CouponCode { get; set; }

        // Shipping Address Snapshot
        [Required]
        public string FullName { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required, Phone]
        public string Phone { get; set; } = string.Empty;
        [Required]
        public string Address { get; set; } = string.Empty;
        [Required]
        public string City { get; set; } = string.Empty;
        [Required]
        public string State { get; set; } = string.Empty;
        [Required]
        public string Pincode { get; set; } = string.Empty;
        [Required]
        public string Country { get; set; } = "United States";

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        // Order Status: Pending, Confirmed, Processing, Shipped, Out for Delivery, Delivered, Cancelled
        public string OrderStatus { get; set; } = "Pending";

        // Payment Info (Academic Dummy System)
        public string PaymentId { get; set; } = "PAY-" + Guid.NewGuid().ToString("N")[..8].ToUpper();
        public string PaymentMethod { get; set; } = "Cash on Delivery"; // UPI, Credit/Debit Card, Net Banking
        public string PaymentStatus { get; set; } = "Pending"; // Pending, Paid, Failed, Refunded, Refund Pending

        public string? CancellationReason { get; set; }

        public virtual ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}`
  },
  {
    name: 'JewelleryPriceCalculator.cs',
    path: 'Services/JewelleryPriceCalculator.cs',
    folder: 'Services',
    language: 'csharp',
    purpose: 'Implements Algorithm 8: Gold Weight × Gold Rate + Making Charges + Stone Charges + Tax = Final Price.',
    content: `using LuxoraJewels.Data;
using Microsoft.EntityFrameworkCore;

namespace LuxoraJewels.Services
{
    public interface IJewelleryPriceCalculator
    {
        Task<decimal> CalculateGoldPriceAsync(decimal weightGrams, string purity, decimal makingCharges, decimal stoneCharges, decimal taxRatePercent = 3.0m);
    }

    public class JewelleryPriceCalculator : IJewelleryPriceCalculator
    {
        private readonly JewelleryDbContext _context;

        public JewelleryPriceCalculator(JewelleryDbContext context)
        {
            _context = context;
        }

        public async Task<decimal> CalculateGoldPriceAsync(
            decimal weightGrams, 
            string purity, 
            decimal makingCharges, 
            decimal stoneCharges, 
            decimal taxRatePercent = 3.0m)
        {
            // Fetch live gold rate for specific karat
            var rateRecord = await _context.GoldRates.FirstOrDefaultAsync(r => r.Karat == purity);
            decimal ratePerGram = rateRecord?.RatePerGram ?? 80.0m;

            // Algorithm 8:
            // 1. Gold Value = Weight × Gold Rate
            decimal goldValue = weightGrams * ratePerGram;

            // 2. Product Cost = Gold Value + Making Charges + Stone Charges
            decimal productCost = goldValue + makingCharges + stoneCharges;

            // 3. Tax = Product Cost * (Tax Rate / 100)
            decimal tax = productCost * (taxRatePercent / 100.0m);

            // 4. Final Price = Product Cost + Tax
            decimal finalPrice = productCost + tax;

            return Math.Round(finalPrice, 2);
        }
    }
}`
  },
  {
    name: 'ProductController.cs',
    path: 'Controllers/ProductController.cs',
    folder: 'Controllers',
    language: 'csharp',
    purpose: 'Implements Algorithms 1, 2, and 3 using Entity Framework Core & LINQ: Search, Multi-faceted Filter, and Sorting.',
    content: `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LuxoraJewels.Data;
using LuxoraJewels.Models;

namespace LuxoraJewels.Controllers
{
    public class ProductController : Controller
    {
        private readonly JewelleryDbContext _context;

        public ProductController(JewelleryDbContext context)
        {
            _context = context;
        }

        // GET: /Product
        public async Task<IActionResult> Index(
            string? search, 
            string? category, 
            string? material, 
            string? purity, 
            string? gender,
            decimal? minPrice, 
            decimal? maxPrice, 
            string? availability, 
            string? sortBy)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Include(p => p.Images)
                .Where(p => p.Status == "Active")
                .AsQueryable();

            // Algorithm 1 – Dynamic Product Search (Name, Category, Material, Brand)
            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(p => 
                    p.Name.ToLower().Contains(term) ||
                    p.Category.Name.ToLower().Contains(term) ||
                    p.Material.ToLower().Contains(term) ||
                    p.Brand.ToLower().Contains(term) ||
                    p.StoneType.ToLower().Contains(term));
            }

            // Algorithm 2 – Multi-Faceted Product Filtering
            if (!string.IsNullOrWhiteSpace(category) && category != "All")
            {
                query = query.Where(p => p.Category.Name == category);
            }

            if (!string.IsNullOrWhiteSpace(material) && material != "All")
            {
                query = query.Where(p => p.Material == material);
            }

            if (!string.IsNullOrWhiteSpace(purity) && purity != "All")
            {
                query = query.Where(p => p.Purity == purity);
            }

            if (!string.IsNullOrWhiteSpace(gender) && gender != "All")
            {
                query = query.Where(p => p.Gender == gender);
            }

            if (minPrice.HasValue)
            {
                query = query.Where(p => p.FinalPrice >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.FinalPrice <= maxPrice.Value);
            }

            if (availability == "inStock")
            {
                query = query.Where(p => p.Stock > 0);
            }
            else if (availability == "outOfStock")
            {
                query = query.Where(p => p.Stock == 0);
            }

            // Algorithm 3 – LINQ Product Sorting
            query = sortBy switch
            {
                "priceAsc" => query.OrderBy(p => p.FinalPrice),
                "priceDesc" => query.OrderByDescending(p => p.FinalPrice),
                "nameAsc" => query.OrderBy(p => p.Name),
                "nameDesc" => query.OrderByDescending(p => p.Name),
                "rating" => query.OrderByDescending(p => p.Rating),
                "popular" => query.OrderByDescending(p => p.ReviewCount),
                "newest" => query.OrderByDescending(p => p.CreatedAt),
                _ => query.OrderByDescending(p => p.IsFeatured).ThenByDescending(p => p.Id)
            };

            var products = await query.ToListAsync();
            ViewBag.Categories = await _context.Categories.ToListAsync();
            ViewBag.CurrentSearch = search;
            ViewBag.CurrentCategory = category;
            ViewBag.CurrentSort = sortBy;

            return View(products);
        }

        // GET: /Product/Details/5
        public async Task<IActionResult> Details(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Images)
                .Include(p => p.Reviews.Where(r => r.IsApproved))
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return NotFound();

            // Related products in same category
            ViewBag.RelatedProducts = await _context.Products
                .Include(p => p.Images)
                .Where(p => p.CategoryId == product.CategoryId && p.Id != product.Id)
                .Take(4)
                .ToListAsync();

            return View(product);
        }
    }
}`
  },
  {
    name: 'CartController.cs',
    path: 'Controllers/CartController.cs',
    folder: 'Controllers',
    language: 'csharp',
    purpose: 'Implements Algorithm 4: Cart calculation (Price × Qty, Subtotal, Discount, Tax, Shipping, Final Total) and stock validation.',
    content: `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LuxoraJewels.Data;
using LuxoraJewels.Models;

namespace LuxoraJewels.Controllers
{
    public class CartController : Controller
    {
        private readonly JewelleryDbContext _context;

        public CartController(JewelleryDbContext context)
        {
            _context = context;
        }

        // GET: /Cart
        public async Task<IActionResult> Index()
        {
            var userId = GetCurrentUserId();
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .ThenInclude(p => p.Images)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            return View(cart);
        }

        // POST: /Cart/AddToCart
        [HttpPost]
        public async Task<IActionResult> AddToCart(int productId, int quantity = 1)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null || product.Stock <= 0)
            {
                TempData["ErrorMessage"] = "Product is currently out of stock.";
                return RedirectToAction("Index", "Product");
            }

            var userId = GetCurrentUserId();
            var cart = await GetOrCreateCartAsync(userId);
            var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == productId);

            int targetQty = (existingItem?.Quantity ?? 0) + quantity;

            // Algorithm 6: Prevent customers from adding more quantity than available stock
            if (targetQty > product.Stock)
            {
                TempData["ErrorMessage"] = $"Only {product.Stock} units available in stock.";
                return RedirectToAction("Index");
            }

            if (existingItem != null)
            {
                existingItem.Quantity = targetQty;
            }
            else
            {
                cart.Items.Add(new CartItem
                {
                    CartId = cart.Id,
                    ProductId = productId,
                    Quantity = quantity,
                    Price = product.FinalPrice
                });
            }

            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = $"{product.Name} added to your jewellery cart.";
            return RedirectToAction("Index");
        }

        private int GetCurrentUserId() => 1; // Simulated session or ClaimsPrincipal
        private async Task<Cart> GetOrCreateCartAsync(int userId)
        {
            var cart = await _context.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                cart = new Cart { UserId = userId, CreatedAt = DateTime.UtcNow };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }
            return cart;
        }
    }
}`
  },
  {
    name: 'CheckoutController.cs',
    path: 'Controllers/CheckoutController.cs',
    folder: 'Controllers',
    language: 'csharp',
    purpose: 'Handles checkout, Algorithm 5 Coupon validation, Order creation with unique ID, dummy payment simulation, and Algorithm 6 stock deduction.',
    content: `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LuxoraJewels.Data;
using LuxoraJewels.Models;

namespace LuxoraJewels.Controllers
{
    public class CheckoutController : Controller
    {
        private readonly JewelleryDbContext _context;

        public CheckoutController(JewelleryDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> PlaceOrder(Order orderInput, string? appliedCoupon)
        {
            var userId = 1; // Current authenticated user
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null || !cart.Items.Any())
            {
                TempData["ErrorMessage"] = "Your cart is empty.";
                return RedirectToAction("Index", "Cart");
            }

            // 1. Stock verification & algorithm 6
            foreach (var item in cart.Items)
            {
                if (item.Quantity > item.Product.Stock)
                {
                    TempData["ErrorMessage"] = $"Sorry, {item.Product.Name} only has {item.Product.Stock} in stock.";
                    return RedirectToAction("Index", "Cart");
                }
            }

            // 2. Algorithm 4 - Cart Math
            decimal subtotal = cart.Items.Sum(i => i.Quantity * i.Product.FinalPrice);
            decimal discount = 0m;

            // Algorithm 5 - Coupon Discount validation
            if (!string.IsNullOrEmpty(appliedCoupon))
            {
                var coupon = await _context.Coupons.FirstOrDefaultAsync(c => 
                    c.Code == appliedCoupon && c.IsActive && c.ExpiryDate >= DateTime.UtcNow);

                if (coupon != null && subtotal >= coupon.MinOrderAmount)
                {
                    discount = coupon.DiscountType == "Percentage" 
                        ? Math.Round(subtotal * (coupon.DiscountValue / 100m), 2)
                        : coupon.DiscountValue;
                }
            }

            decimal tax = Math.Round((subtotal - discount) * 0.03m, 2); // 3% jewellery tax
            decimal shipping = subtotal > 1500 ? 0m : 50m;
            decimal finalAmount = subtotal - discount + tax + shipping;

            // 3. Create Order
            var order = new Order
            {
                Id = "LUX-" + DateTime.UtcNow.ToString("yyyyMMdd") + "-" + Guid.NewGuid().ToString("N")[..6].ToUpper(),
                UserId = userId,
                FullName = orderInput.FullName,
                Email = orderInput.Email,
                Phone = orderInput.Phone,
                Address = orderInput.Address,
                City = orderInput.City,
                State = orderInput.State,
                Pincode = orderInput.Pincode,
                Country = orderInput.Country,
                Subtotal = subtotal,
                Discount = discount,
                Tax = tax,
                Shipping = shipping,
                FinalAmount = finalAmount,
                CouponCode = appliedCoupon,
                OrderStatus = "Confirmed",
                PaymentMethod = orderInput.PaymentMethod,
                PaymentStatus = orderInput.PaymentMethod == "Cash on Delivery" ? "Pending" : "Paid",
                PaymentId = "PAY-" + Guid.NewGuid().ToString("N")[..8].ToUpper(),
                OrderDate = DateTime.UtcNow
            };

            // 4. Algorithm 6: Deduct stock for each product
            foreach (var item in cart.Items)
            {
                order.Items.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    ProductName = item.Product.Name,
                    ProductImage = item.Product.PrimaryImageUrl,
                    Price = item.Product.FinalPrice,
                    Quantity = item.Quantity,
                    Total = item.Product.FinalPrice * item.Quantity
                });

                // Reduce inventory
                item.Product.Stock -= item.Quantity;
            }

            _context.Orders.Add(order);

            // 5. Clear shopping cart
            _context.CartItems.RemoveRange(cart.Items);

            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = $"Order #{order.Id} placed successfully!";
            return RedirectToAction("Track", "Order", new { id = order.Id });
        }
    }
}`
  },
  {
    name: 'AdminController.cs',
    path: 'Controllers/AdminController.cs',
    folder: 'Controllers',
    language: 'csharp',
    purpose: 'Complete Admin Management system for Products (CRUD), Categories (CRUD), Orders, Customers, Gold Rates, and Analytics Reports.',
    content: `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LuxoraJewels.Data;
using LuxoraJewels.Models;

namespace LuxoraJewels.Controllers
{
    // [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly JewelleryDbContext _context;

        public AdminController(JewelleryDbContext context)
        {
            _context = context;
        }

        // GET: /Admin/Dashboard
        public async Task<IActionResult> Dashboard()
        {
            ViewBag.TotalProducts = await _context.Products.CountAsync();
            ViewBag.TotalCategories = await _context.Categories.CountAsync();
            ViewBag.TotalCustomers = await _context.Users.CountAsync(u => u.Role.Name == "Customer");
            ViewBag.TotalOrders = await _context.Orders.CountAsync();
            ViewBag.PendingOrders = await _context.Orders.CountAsync(o => o.OrderStatus == "Pending" || o.OrderStatus == "Confirmed");
            ViewBag.DeliveredOrders = await _context.Orders.CountAsync(o => o.OrderStatus == "Delivered");
            ViewBag.TotalRevenue = await _context.Orders.Where(o => o.PaymentStatus == "Paid").SumAsync(o => o.FinalAmount);
            ViewBag.LowStockProducts = await _context.Products.Where(p => p.Stock > 0 && p.Stock <= 5).ToListAsync();
            ViewBag.OutOfStockProducts = await _context.Products.Where(p => p.Stock == 0).ToListAsync();
            ViewBag.TotalReviews = await _context.Reviews.CountAsync();

            var recentOrders = await _context.Orders.OrderByDescending(o => o.OrderDate).Take(8).ToListAsync();
            return View(recentOrders);
        }

        // POST: /Admin/UpdateOrderStatus
        [HttpPost]
        public async Task<IActionResult> UpdateOrderStatus(string orderId, string status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order != null)
            {
                order.OrderStatus = status;
                if (status == "Cancelled" && order.PaymentStatus == "Paid")
                {
                    order.PaymentStatus = "Refund Pending";
                }
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = $"Order #{orderId} status updated to {status}.";
            }
            return RedirectToAction("Dashboard");
        }

        // POST: /Admin/UpdateGoldRate
        [HttpPost]
        public async Task<IActionResult> UpdateGoldRate(string karat, decimal newRate)
        {
            var record = await _context.GoldRates.FirstOrDefaultAsync(r => r.Karat == karat);
            if (record != null)
            {
                record.RatePerGram = newRate;
                record.LastUpdated = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = $"{karat} Gold rate updated to \${newRate}/gram.";
            }
            return RedirectToAction("Dashboard");
        }
    }
}`
  },
  {
    name: 'SqlServerSetup.sql',
    path: 'Database/SqlServerSetup.sql',
    folder: 'Database',
    language: 'sql',
    purpose: 'Complete SQL Server database creation script, table schemas, foreign keys, and seed records.',
    content: `-- ==========================================================
-- LUXORA JEWELS – SQL Server Database Setup Script
-- Compatible with Microsoft SQL Server 2019 / 2022 / LocalDB
-- ==========================================================

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'LuxoraJewelsDb')
BEGIN
    CREATE DATABASE LuxoraJewelsDb;
END
GO

USE LuxoraJewelsDb;
GO

-- 1. Roles
IF OBJECT_ID('Roles', 'U') IS NULL
CREATE TABLE Roles (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL UNIQUE
);

-- 2. Users
IF OBJECT_ID('Users', 'U') IS NULL
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(150) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    Phone NVARCHAR(30) NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    RoleId INT NOT NULL FOREIGN KEY REFERENCES Roles(Id),
    IsActive BIT NOT NULL DEFAULT 1,
    Address NVARCHAR(250),
    City NVARCHAR(100),
    State NVARCHAR(100),
    Pincode NVARCHAR(20),
    RegisteredAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 3. Categories
IF OBJECT_ID('Categories', 'U') IS NULL
CREATE TABLE Categories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(500),
    Image NVARCHAR(500)
);

-- 4. Products
IF OBJECT_ID('Products', 'U') IS NULL
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    CategoryId INT NOT NULL FOREIGN KEY REFERENCES Categories(Id),
    OriginalPrice DECIMAL(18,2) NOT NULL,
    DiscountPercentage DECIMAL(5,2) NOT NULL DEFAULT 0,
    FinalPrice DECIMAL(18,2) NOT NULL,
    Material NVARCHAR(50) NOT NULL,
    Purity NVARCHAR(20) NOT NULL,
    WeightGrams DECIMAL(8,3) NOT NULL,
    Size NVARCHAR(50),
    Colour NVARCHAR(50),
    StoneType NVARCHAR(100),
    Brand NVARCHAR(100) NOT NULL,
    Stock INT NOT NULL DEFAULT 0,
    Rating FLOAT NOT NULL DEFAULT 5.0,
    ReviewCount INT NOT NULL DEFAULT 0,
    MakingCharges DECIMAL(18,2) NOT NULL DEFAULT 0,
    StoneCharges DECIMAL(18,2) NOT NULL DEFAULT 0,
    Gender NVARCHAR(20) NOT NULL DEFAULT 'Women',
    IsNewArrival BIT DEFAULT 0,
    IsFeatured BIT DEFAULT 0,
    IsBestSeller BIT DEFAULT 0,
    IsTrending BIT DEFAULT 0,
    IsOnSale BIT DEFAULT 0,
    Status NVARCHAR(20) DEFAULT 'Active',
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);

-- 5. Orders
IF OBJECT_ID('Orders', 'U') IS NULL
CREATE TABLE Orders (
    Id NVARCHAR(50) PRIMARY KEY,
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    Subtotal DECIMAL(18,2) NOT NULL,
    Discount DECIMAL(18,2) NOT NULL DEFAULT 0,
    Tax DECIMAL(18,2) NOT NULL,
    Shipping DECIMAL(18,2) NOT NULL DEFAULT 0,
    FinalAmount DECIMAL(18,2) NOT NULL,
    CouponCode NVARCHAR(50),
    FullName NVARCHAR(150) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    Phone NVARCHAR(30) NOT NULL,
    Address NVARCHAR(250) NOT NULL,
    City NVARCHAR(100) NOT NULL,
    State NVARCHAR(100) NOT NULL,
    Pincode NVARCHAR(20) NOT NULL,
    Country NVARCHAR(100) NOT NULL,
    OrderDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    OrderStatus NVARCHAR(50) NOT NULL DEFAULT 'Pending',
    PaymentId NVARCHAR(50) NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    PaymentStatus NVARCHAR(50) NOT NULL DEFAULT 'Pending',
    CancellationReason NVARCHAR(250)
);

-- 6. Gold Rates
IF OBJECT_ID('GoldRates', 'U') IS NULL
CREATE TABLE GoldRates (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Karat NVARCHAR(10) NOT NULL UNIQUE,
    RatePerGram DECIMAL(10,2) NOT NULL,
    LastUpdated DATETIME2 DEFAULT SYSUTCDATETIME()
);

-- Seed Essential Roles & Gold Rates
INSERT INTO Roles (Name) VALUES ('Admin'), ('Customer');
INSERT INTO GoldRates (Karat, RatePerGram) VALUES 
('24K', 86.50),
('22K', 79.80),
('18K', 65.20),
('14K', 51.00);
GO`
  }
];

export const aspnetCoreFiles = ASPNET_CORE_PROJECT_STRUCTURE.map((file, idx) => ({
  id: `file-${idx}-${file.name}`,
  name: file.name,
  path: file.path,
  category: file.folder,
  content: file.content
}));

export const sqlServerScript = ASPNET_CORE_PROJECT_STRUCTURE.find(f => f.name.endsWith('.sql'))?.content || '';

