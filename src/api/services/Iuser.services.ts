import type { AuthResponseDto } from "../dtos/auth.dto.ts";
import type { LoginRequestDto, RegisterRequestDto } from "../dtos/users.dto.ts";

export interface IUserService {
  registerAsync(dto: RegisterRequestDto): Promise<AuthResponseDto>;
  loginAsync(dto: LoginRequestDto): Promise<AuthResponseDto>;
}
