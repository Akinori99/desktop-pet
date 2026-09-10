use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct ScreenBounds {
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
}