// ==========================================================================
// THE ONE CONFIG FILE for this site. Every "Buy" button reads its link here.
// After a product is live on Payhip/Gumroad, paste its product URL below.
// Any value still starting with "https://REPLACE" is treated as not-set:
// its buttons fall back to the on-site product listing instead of a store.
// Keep this valid JSON between the first "{" and the final "}" because
// _build/generate.py also reads it (for sitemap.xml / robots.txt).
// ==========================================================================
window.SITE = {
  "brand": "Life Helpers Inc.",
  "baseUrl": "https://coolhvacleads-star.github.io/life-helpers",
  "newsletterUrl": "",
  "contactEmail": "",
  "contactUrl": "https://payhip.com/LifeHelpersInc",
  "products": {
    "landlord-move-out-kit":         {"url": "https://payhip.com/b/HuhmG",         "price": "$19"},
    "debt-payoff-planner":           {"url": "https://payhip.com/b/t4RmS",           "price": "$12"},
    "family-emergency-binder":       {"url": "https://payhip.com/b/qrgOJ",       "price": "$15"},
    "contractor-change-order-pack":  {"url": "https://payhip.com/b/aTDiO",  "price": "$19"},
    "freelancer-income-tax-tracker": {"url": "https://payhip.com/b/kU9JD", "price": "$15"},
    "home-maintenance-binder":       {"url": "https://payhip.com/b/d3lgP",       "price": "$12"},
    "caregiver-hospital-go-folder":  {"url": "https://payhip.com/b/NvgXC",  "price": "$12"},
    "pet-sitter-command-binder":     {"url": "https://payhip.com/b/pB3Lg",     "price": "$9"},
    "muddler-busters-sink-or-float": {"url": "https://REPLACE-WITH-STORE-LINK/muddler-busters-sink-or-float", "price": "$6"},
    "why-vision-journal":            {"url": "https://REPLACE-WITH-STORE-LINK/why-vision-journal",            "price": "$7"},
    "bolts-build-lab":               {"url": "https://REPLACE-WITH-STORE-LINK/bolts-build-lab",               "price": "$8"}
  }
};
