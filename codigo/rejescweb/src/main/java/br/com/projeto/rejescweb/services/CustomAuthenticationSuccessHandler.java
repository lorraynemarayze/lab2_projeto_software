package br.com.projeto.rejescweb.services;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import br.com.projeto.rejescweb.models.User;
import br.com.projeto.rejescweb.repository.UserRepository;

import java.io.IOException;
import java.util.Optional;

/**
 * Classe responsável por lidar com a autenticação conforme roles de usuário. Na classe User, os roles são definidos
 * pela boolean "agente". Conforme seu role, o WebSecurityConfig direcionará o usuário para sua respectiva página
 */
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
    private UserRepository userRepository;

    public CustomAuthenticationSuccessHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        AuthenticationSuccessHandler.super.onAuthenticationSuccess(request, response, chain, authentication);
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        handle(request, response, authentication);
    }

    protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {
        String targetUrl = determineTargetUrl(authentication);

        if (response.isCommitted()) {
            return;
        }

        redirectStrategy.sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(Authentication authentication) {
        String username = authentication.getName();

        Optional<User> userOptional = userRepository.findById(username);

        if (userOptional.isPresent()) {
            br.com.projeto.rejescweb.models.User user = userOptional.get();

            // Checa se o usuário possui o campo "isAgente" true
            if (user.isAgente()) {
                return "/homepage"; // Se sim, direciona para homepage de agente
            } else {
                return "/userpage"; // Se não, direciona para homepage de usuário
            }
        }

        // URL Default para que o método tenha return
        return "/";
    }

}
