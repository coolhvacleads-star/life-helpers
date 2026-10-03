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
    "executor-first-90-days": {"url": "https://payhip.com/b/RisdY", "price": "$29"},
    "freelancer-year-end-q4-pack": {"url": "https://payhip.com/b/kRSUp", "price": "$9"},
    "holiday-away-pack": {"url": "https://payhip.com/b/AjFWv", "price": "$12"},
    "before-i-forget": {"url": "https://payhip.com/b/je8Wi", "price": "$14"},
    "hang-up-first": {"url": "https://payhip.com/b/e2Yxo", "price": "$12"},
    "parent-pack": {"url": "https://payhip.com/b/ZtKqW", "price": "$22"},
    "muddler-busters-sink-or-float": {"url": "https://REPLACE-WITH-STORE-LINK/muddler-busters-sink-or-float", "price": "$6"},
    "why-vision-journal":            {"url": "https://REPLACE-WITH-STORE-LINK/why-vision-journal",            "price": "$7"},
    "bolts-build-lab":               {"url": "https://REPLACE-WITH-STORE-LINK/bolts-build-lab",               "price": "$8"},
    "holiday-host-command-binder": {"url": "https://payhip.com/b/AMI6g", "price": "$9"},
    "keep-the-power-on": {"url": "https://payhip.com/b/cQwIP", "price": "$15"},
    "find-each-other": {"url": "https://payhip.com/b/lbMUw", "price": "$9"},
    "turning-65-medicare-kit": {"url": "https://payhip.com/b/toX4j", "price": "$12"},
    "divorce-financial-disclosure-organizer": {"url": "https://payhip.com/b/LNZ0Q", "price": "$19"},
    "property-tax-appeal-evidence-kit": {"url": "https://payhip.com/b/wVsDy", "price": "$29"}
  }
};
