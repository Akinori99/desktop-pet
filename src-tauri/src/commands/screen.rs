use tauri::AppHandle;

use crate::models::screen_bounds::ScreenBounds;

#[tauri::command]
pub fn get_screen_bounds(app: AppHandle) -> Result<ScreenBounds, String> {
    let monitor = app
        .primary_monitor()
        .map_err(|error| error.to_string())?
        .ok_or_else(|| "Primary monitor not found".to_string())?;

    let position = monitor.position();
    let size = monitor.size();

    Ok(ScreenBounds {
        x: position.x as f64,
        y: position.y as f64,
        width: size.width as f64,
        height: size.height as f64,
    })
}

#[tauri::command]
pub fn get_usable_screen_bounds(app: AppHandle) -> Result<ScreenBounds, String> {
    let monitor = app
        .primary_monitor()
        .map_err(|error| error.to_string())?
        .ok_or_else(|| "Primary monitor not found".to_string())?;

    let work_area = monitor.work_area();

    Ok(ScreenBounds {
        x: work_area.position.x as f64,
        y: work_area.position.y as f64,
        width: work_area.size.width as f64,
        height: work_area.size.height as f64,
    })
}