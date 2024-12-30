// tokenValidator.js

/**
 * 检查 Token 格式是否有效 (JWT 格式: Header.Payload.Signature)
 * @param {string} token - 要验证的 Token
 * @returns {boolean} - 格式是否有效
 */
function isValidTokenFormat(token) {
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  return jwtPattern.test(token);
}

/**
 * 解码并解析 JWT 的 Payload 部分
 * @param {string} token - 要解析的 Token
 * @returns {Object|null} - 解析后的 Payload 对象，解析失败返回 null
 */
function parseJWT(token) {
  try {
    const payloadBase64 = token.split(".")[1];
    return JSON.parse(atob(payloadBase64));
  } catch (e) {
    console.error("解析 Token 出错:", e);
    return null;
  }
}

/**
 * 检查 Token 是否已过期
 * @param {string} token - 要验证的 Token
 * @returns {boolean} - 是否已过期
 */
function isTokenExpired(token) {
  const payload = parseJWT(token);
  if (!payload || !payload.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000); // 当前时间，单位秒
  return payload.exp < currentTime;
}

/**
 * 向后端验证 Token 的有效性
 * @param {string} token - 要验证的 Token
 * @param {string} validateUrl - 后端验证 Token 的 API 地址
 * @returns {Promise<boolean>} - 是否有效
 */
async function validateTokenWithBackend(token, validateUrl) {
  try {
    const response = await fetch(validateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.valid || false;
  } catch (error) {
    console.error("向后端验证 Token 出错:", error);
    return false;
  }
}

/**
 * 主函数：验证本地存储中的 Token
 * @param {string} storageKey - 本地存储的 Key（默认: 'token'）
 * @param {string} validateUrl - 后端验证 Token 的 API 地址
 * @returns {Promise<boolean>} - 最终是否有效
 */
async function validateLocalToken(storageKey = "token", validateUrl) {
  const token = localStorage.getItem(storageKey);

  if (!token) {
    console.warn("本地存储中未找到 Token");
    return false;
  }

  if (!isValidTokenFormat(token)) {
    console.warn("Token 格式不正确");
    return false;
  }

  if (isTokenExpired(token)) {
    console.warn("Token 已过期");
    return false;
  }

  // 如果格式正确且未过期，向后端进一步验证
  const isValid = await validateTokenWithBackend(token, validateUrl);
  if (!isValid) {
    console.warn("后端验证 Token 失败");
  }

  return isValid;
}

// 导出模块
export {
  isValidTokenFormat,
  parseJWT,
  isTokenExpired,
  validateTokenWithBackend,
  validateLocalToken,
};
